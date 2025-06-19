package org.example.authservice.service.impl;

import com.netflix.discovery.converters.Auto;
import org.example.authservice.config.JwtService;
import org.example.authservice.dto.response.Oauth2Response;
import org.example.authservice.entity.Account;
import org.example.authservice.entity.Role;
import org.example.authservice.entity.User;
import org.example.authservice.entity.enu.Provider;
import org.example.authservice.entity.enu.RoleUser;
import org.example.authservice.repository.AccountRepository;
import org.example.authservice.repository.RoleRepository;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.service.Oauth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class Oauth2ServiceImplement implements Oauth2Service {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Oauth2Response Oauth2Login(OAuth2User oAuth2User, String provider) {

        System.out.print("aaaaaaaaaaaaaaaaaaaaaaaaaaa" + provider);

        String email = oAuth2User.getAttribute("email");
        String username = oAuth2User.getAttribute("name");
        Oauth2Response oauth2Response = new Oauth2Response();

        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent() && account.get().is_Active()) {
            String tokenKey = jwtService.generateToken(email, account.get().getRole().getRoleName().toString());
            oauth2Response.setToken(tokenKey);
            oauth2Response.setRole(account.get().getRole().getRoleName());
            return oauth2Response;
        } else {
            Account account1 = new Account();
            Role role = roleRepository.findByRoleName(RoleUser.USER);

            User user = new User();
            user.setUserName(username);
            userRepository.save(user);

            account1.setUser(user);
            account1.setRole(role);
            account1.setEmail(email);
            if (provider.equals("facebook")) {
                account1.setProvider(Provider.FACEBOOK);
            }else if (provider.equals("google")){
                account1.setProvider((Provider.GOOGLE));
            }
            account1.set_Active(true);
            accountRepository.save(account1);
            String tokenKey = jwtService.generateToken(email,account1.getRole().getRoleName().toString());

            oauth2Response.setToken(tokenKey);
            oauth2Response.setRole(account1.getRole().getRoleName());
            return oauth2Response;
        }
    }
}
