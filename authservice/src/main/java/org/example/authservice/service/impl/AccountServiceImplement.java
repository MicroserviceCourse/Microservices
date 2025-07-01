package org.example.authservice.service.impl;

import org.example.authservice.config.JwtService;
import org.example.authservice.dto.AccountDTO;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.example.authservice.dto.request.AuthCodeRequest;
import org.example.authservice.dto.request.LoginDTO;
import org.example.authservice.dto.request.ResetPassRequest;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.entity.User;
import org.example.authservice.entity.enu.Provider;
import org.example.authservice.entity.enu.RoleUser;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.generic.genericService;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.service.AccountService;
import org.example.authservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountServiceImplement implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;

    @Value("${link.reset.password}")
    private String linkResetPass;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void save(LoginDTO loginDTO) {
        try {
            LocalDateTime now = LocalDateTime.now();
            Optional<Account> account1 = accountRepository.findByEmail(loginDTO.getEmail());
            int code = emailService.generateCode();
            if (account1.isPresent()) {
                if (account1.get().is_Active()) {
                    throw new RuntimeException("Email đã tồn tại");

                } else if (now.isAfter(account1.get().getExpirationTimeRegistry()) &&
                        now.isBefore(account1.get().getExpirationTimeRegistry().plusMinutes(1))) {
                    throw new RuntimeException("Vui lòng đợi một phút sau để yêu cầu lại!");

                } else if (now.isAfter(account1.get().getExpirationTimeRegistry().plusMinutes(1))) {
                    account1.get().setAuthCode(String.valueOf(code));
                    account1.get().setExpirationTimeRegistry(now);
                    accountRepository.save(account1.get());
                    emailService.Sendmail("cunnconn01@gmail.com", loginDTO.getEmail(),
                            String.valueOf(code), "XÁC MINH TÀI KHOẢN", "email_template");
                }
            } else {
                genericService genericService = new genericService();
                genericService.validatePassword(loginDTO.getPassword());

                emailService.Sendmail("cunnconn01@gmail.com", loginDTO.getEmail(),
                        String.valueOf(code), "XÁC MINH TÀI KHOẢN", "email_template");

                Role role = roleRepository.findByRoleName(RoleUser.USER);
                User user = new User();
                userRepository.save(user);

                Account account = new Account();
                account.setUser(user);
                account.setRole(role);
                account.setEmail(loginDTO.getEmail());
                account.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
                account.setAuthCode(String.valueOf(code));
                account.setExpirationTimeRegistry(now);
                account.set_Active(false);
                account.setProvider(Provider.LOCAL);
                accountRepository.save(account);
            }

        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public void verifyAuthCode(AuthCodeRequest authCodeRequest) {
        try {
            Optional<Account> account = accountRepository.findByEmail(authCodeRequest.getEmail());

            if (account.isEmpty()) {
                throw new RuntimeException("Người dùng không tồn tại, vui lòng đăng kí lại");
            }

            LocalDateTime now = LocalDateTime.now();
            if (now.isAfter(account.get().getExpirationTimeRegistry().plusMinutes(2))) {
                accountRepository.deleteById(account.get().getId());
                throw new RuntimeException("Đã hết thời gian xác minh tài khoản, vui lòng đăng kí lại");
            }

            if (!account.get().getAuthCode().equals(String.valueOf(authCodeRequest.getCode()))) {
                throw new RuntimeException("Mã xác thực không đúng vui lòng thử lại");
            }
            account.get().set_Active(true);
            account.get().setAuthCode(null);
            accountRepository.save(account.get());

        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public Account findByEmail(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent()) {
            return account.get();
        } else {
            throw new ErrorHandler(HttpStatus.NOT_FOUND, "Account not found");
        }
    }

    @Override
    public String getRolesForUser(Account account) {
        return account.getRole().getRoleName().toString();
    }

    @Override
    public Account getAccountFromToken(String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            String username=jwtService.extractUsername(token);
            return accountRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        }catch (Exception e) {
            throw new RuntimeException("Invalid token",e);
        }
    }

    @Override
    public AccountDTO todo(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setEmail(account.getEmail());
        accountDTO.setRole(account.getRole().getRoleName().toString());
        accountDTO.setIdRole(account.getRole().getId_role());
        accountDTO.setId(account.getId());
        return accountDTO;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(username);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }


    //gửi url reset pass qua mail
    //reset_key dùng để xác thực người dùng khi reset
    //Check số lần gửi request , giới hạn 5 lần trong 10 phút,
    // cứ qua một lần yêu cầu thành công thì gán lại thời gian( thời gian của request thành công cuối cùng) và số lượt gửi
    @Override
    public void generateResetPasswordUrl(String email) {
        try {
            Optional<Account> account = accountRepository.findByEmail(email);
            if (account.isEmpty()) {
                throw new RuntimeException("Tài khoản không tồn tại");
            }
            String reset_key = UUID.randomUUID().toString();

            LocalDateTime now = LocalDateTime.now();
            if (account.get().getExpirationTimeResetPass() != null) {
                if (now.isBefore(account.get().getExpirationTimeResetPass().plusMinutes(10))) {
                    if (account.get().getUserRequestAttemptCount() >= 5) {
                        throw new RuntimeException("Đã quá số lượt yêu cầu, vui lòng thử lại sau :");
                    }
                } else {
                    account.get().setUserRequestAttemptCount(0);
                }
            }

            account.get().setExpirationTimeResetPass(now);
            account.get().setAuthCode(reset_key);
            account.get().setUserRequestAttemptCount(account.get().getUserRequestAttemptCount() + 1);
            accountRepository.save(account.get());
            String resetLink = linkResetPass + "/reset-password?" + "&reset_key=" + reset_key;

            emailService.Sendmail("cunnconn01@gmail.com", email,
                    resetLink, "KHÔI PHỤC MẬT KHẨU", "reset_password_template");

        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    //đặt lại mật khẩu
    @Override
    public void resetPassword(ResetPassRequest resetPassRequest) {
        try {
            Optional<Account> account = accountRepository.findByEmail(resetPassRequest.getEmail());
            if (account.isEmpty()) {
                throw new RuntimeException("Tài khoản không tồn tại!");
            }

            if (!account.get().getAuthCode().equals(resetPassRequest.getResetKey())) {
                throw new RuntimeException("Không thể xác minh vui lòng thử lại");
            }

            String newPassword = resetPassRequest.getNewPassword();
            if (passwordEncoder.matches(newPassword, account.get().getPassword())) {
                throw new RuntimeException("Mật khẩu mới không thể trùng với mật khẩu cũ");
            }

            genericService genericService = new genericService();
            genericService.validatePassword(resetPassRequest.getNewPassword());

            LocalDateTime now = LocalDateTime.now();
            if (now.isAfter(account.get().getExpirationTimeResetPass().plusMinutes(2))) {
                throw new RuntimeException("Đã hết thời gian đặt lại mật khẩu, vui lòng thử lại!");
            }
//            account.get().setAuthCode(null);
            account.get().setUserRequestAttemptCount(0);
            account.get().setPassword(passwordEncoder.encode(newPassword));
            accountRepository.save(account.get());
        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
