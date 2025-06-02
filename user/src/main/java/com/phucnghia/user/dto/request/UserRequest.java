package com.phucnghia.user.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    @NotBlank(message = "Vui long dien ten!!!")
    private String name;

    @Email(message = "Email khong hop le!!!")
    @NotBlank(message = "Vui long nhap email!!!")
    private String email;

    @Size(min = 6,max =20, message = "Mat khau phai co it nhat 6 ky tu va nhieu nhat 20 ky tu")
    @NotBlank(message = "Vui long nhap mat khau!!!")
    private String password;
}
