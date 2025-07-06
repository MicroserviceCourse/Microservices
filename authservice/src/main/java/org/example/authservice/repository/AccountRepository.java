package org.example.authservice.repository;

import org.example.authservice.entity.Account;
import org.example.authservice.generic.IRepository;

import java.util.Optional;

public interface AccountRepository extends IRepository<Account,Integer> {
    Optional<Account>findByEmail(String email);

}
