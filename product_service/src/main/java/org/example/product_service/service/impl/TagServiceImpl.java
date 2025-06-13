package org.example.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.TagRepository;
import org.example.product_service.dto.request.TagDTO;
import org.example.product_service.entity.Tag;
import org.example.product_service.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Tag create(TagDTO tagDTO) {
        try {
            Tag tag = new Tag();
            tag.setName(tagDTO.getName());
            return tagRepository.save(tag);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm thẻ sản phẩm");
        }
    }

    @Override
    public Tag update(int id, TagDTO tagDTO) {
        try {
            Optional<Tag> tag = tagRepository.findById(id);
            if (tag.isPresent()) {
                Tag oldTag = tag.get();
                oldTag.setName(tagDTO.getName());
                return tagRepository.save(oldTag);
            } else {
                throw new RuntimeException("Tag not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật thẻ sản phẩm");
        }
    }

    @Override
    public Page<Tag> findAll(int page, int size) {
        return tagRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public TagDTO todo(Tag tag) {
        TagDTO tagDTO = new TagDTO();
        tagDTO.setId(tag.getId());
        tagDTO.setName(tag.getName());
        return tagDTO;
    }

    @Override
    public Tag findById(int id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
    }

    @Override
    public void deleteTagById(int id) {
        try {
            if (!tagRepository.existsById(id)) {
                throw new RuntimeException("không tìm thấy thẻ sản phẩm với id:" + id);
            }
            tagRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Không thể xóa thẻ sản phẩm");
        }
    }
}
