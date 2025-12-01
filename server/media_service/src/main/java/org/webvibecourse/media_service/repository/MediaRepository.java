package org.webvibecourse.media_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webvibecourse.media_service.entity.Media;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
