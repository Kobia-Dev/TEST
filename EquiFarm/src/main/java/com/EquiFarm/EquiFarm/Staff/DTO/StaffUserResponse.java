package com.EquiFarm.EquiFarm.Staff.DTO;

import com.EquiFarm.EquiFarm.Farmer.DTO.UserResponse;
import com.EquiFarm.EquiFarm.utils.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffUserResponse {
    private Long id;
    private UserResponse user;
    private String phoneNo;
    private String idNumber;
    private String bio;
    private Gender gender;
    private String profilePicture;
    private boolean available;
}
