package org.webvibecourse.media_service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.webvibecourse.media_service.entity.Media;

public interface MediaRepository
    extends JpaRepository<Media, Long>, JpaSpecificationExecutor<Media> {

  Optional<Media> findByUrl(String url);
}
