package org.example.ratingreviewservice.generic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IRepository<T,ID> extends JpaRepository<T, ID> {
}
