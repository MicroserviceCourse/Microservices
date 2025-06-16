package org.example.authservice.service.impl;

<<<<<<< HEAD
import org.example.authservice.dto.AccountDTO;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
=======
import org.example.authservice.dto.request.AuthCodeRequest;
import org.example.authservice.dto.request.LoginDTO;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.exception.ErrorHandler;
import org.example.authservice.generic.genericService;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.service.AccountService;
import org.example.authservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import java.util.List;
import java.util.Optional;
=======
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5

@Service
public class AccountServiceImplement implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

<<<<<<< HEAD

    @Override
    public Account save(AccountDTO account) {
        try {
            Account account1 = new Account();
            account1.setEmail(account.getEmail());
            account1.setPassword(passwordEncoder.encode(account.getPassword()));
            Role role = roleRepository.findById(account.getIdRole())
                    .orElseThrow(() -> new ErrorHandler(HttpStatus.BAD_REQUEST, "Role not found"));
            account1.setRole(role);
            Account ac=accountRepository.save(account1);
            System.out.println(ac.getId()+" "+ac.getEmail());
            return ac;
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
=======
    @Autowired
    private EmailService emailService;

    @Value("${link.reset.password}")
    private String linkResetPass;

    @Override
    public void save(LoginDTO loginDTO) {
        try {
            Optional<Account> account1 = accountRepository.findByEmail(loginDTO.getEmail());
            if (account1.isPresent() && account1.get().is_Active()) {
                throw new RuntimeException("Email đã tồn tại");
            }
                accountRepository.deleteById(account1.get().getId());
                genericService genericService = new genericService();
                genericService.validatePassword(loginDTO.getPassword());

                int code = emailService.generateCode();

                emailService.Sendmail("cunnconn01@gmail.com", loginDTO.getEmail(),
                        "Mã xác thực tài khoản của bạn là: " + code, "XÁC MINH TÀI KHOẢN");

                LocalDateTime now = LocalDateTime.now();
                Role role = roleRepository.findByRoleName(Role.RoleUser.USER);

                Account account = new Account();
                account.setRole(role);
                account.setEmail(loginDTO.getEmail());
                account.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
                account.setAuthCode(String.valueOf(code));
                account.setExpirationTimeRegistry(now);
                account.set_Active(false);
                account.setProvider(Account.Provider.LOCAL);
                accountRepository.save(account);
        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.BAD_REQUEST, e.getMessage());
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5
        }
    }

    @Override
<<<<<<< HEAD
=======
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

//    @Override
//    public void save(LoginDTO account) {
//        try {
//            if (accountRepository.findByEmail(account.getEmail()).isPresent()) {
//                throw new RuntimeException("Email đã tồn tại");
//            }
//            genericService genericService = new genericService();
//            genericService.validatePassword(account.getPassword());
//
//            Account account1 = new Account();
//            account1.setEmail(account.getEmail());
//            account1.setPassword(passwordEncoder.encode(account.getPassword()));
//            Role role = roleRepository.findByRoleName(Role.RoleUser.USER);
//            account1.setRole(role);
//            account1.setRole(role);
//            accountRepository.save(account1);
//        } catch (Exception e) {
//            throw new ErrorHandler(HttpStatus.BAD_REQUEST, e.getMessage());
//        }
//    }

    @Override
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5
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
<<<<<<< HEAD
        return account.getRole().getRoleName();
=======
        return account.getRole().getRoleName().toString();
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(username);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }
<<<<<<< HEAD
=======


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
                    "Nhấn vào đây để đặt lại mật khẩu của bạn: " + resetLink, "KHÔI PHỤC MẬT KHẨU");

        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    //đặt lại mật khẩu
    @Override
    public void resetPassword(String reset_key, LoginDTO loginDTO) {
        try {
            Optional<Account> account = accountRepository.findByEmail(loginDTO.getEmail());
            if (account.isEmpty()) {
                throw new RuntimeException("Tài khoản không tồn tại!");
            }

            if (!account.get().getAuthCode().equals(reset_key)) {
                throw new RuntimeException("Không thể xác minh vui lòng thử lại");
            }

            String newPassword = loginDTO.getPassword();
            if (passwordEncoder.matches(newPassword, account.get().getPassword())) {
                throw new RuntimeException("Mật khẩu mới không thể trùng với mật khẩu cũ");
            }

            genericService genericService = new genericService();
            genericService.validatePassword(loginDTO.getPassword());

            LocalDateTime now = LocalDateTime.now();
            if (now.isAfter(account.get().getExpirationTimeResetPass().plusMinutes(2))) {
                throw new RuntimeException("Đã hết thời gian đặt lại mật khẩu, vui lòng thử lại!");
            }
            account.get().setAuthCode(null);
            account.get().setUserRequestAttemptCount(0);
            account.get().setPassword(passwordEncoder.encode(newPassword));
            accountRepository.save(account.get());
        } catch (Exception e) {
            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5
}
