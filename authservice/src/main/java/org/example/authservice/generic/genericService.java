package org.example.authservice.generic;

import org.example.authservice.exception.ErrorHandler;
import org.passay.*;
import org.springframework.http.HttpStatus;


import java.util.List;

public class genericService {
    public void validatePassword(String password) {
        PasswordValidator validator = new PasswordValidator(
                List.of(
                        new LengthRule(6, 128), // Độ dài mật khẩu tối thiểu 6 và tối đa 128 ký tự
                        new CharacterRule(EnglishCharacterData.UpperCase, 1), // Ít nhất 1 chữ cái viết hoa
                        new CharacterRule(EnglishCharacterData.LowerCase, 1), // Ít nhất 1 chữ cái viết thường
                        new CharacterRule(EnglishCharacterData.Digit, 1),    // Ít nhất 1 chữ số
                        new CharacterRule(EnglishCharacterData.Special, 1),  // Ít nhất 1 ký tự đặc biệt
                        new WhitespaceRule() // Không chứa khoảng trắng
                )
        );

        // Kiểm tra mật khẩu với các quy tắc
        RuleResult result = validator.validate(new PasswordData(password));
        if (!result.isValid()) {
            // Ném lỗi nếu mật khẩu không hợp lệ
            throw new ErrorHandler(HttpStatus.BAD_REQUEST,
                    String.join(", ", validator.getMessages(result)));
        }
    }
}
