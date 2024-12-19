package io.codeforall.fanstatics.opticpal.converters;

import io.codeforall.fanstatics.opticpal.command.UserDto;
import io.codeforall.fanstatics.opticpal.persistence.model.User;

public class UserToUserDto {

    public UserDto convert(User user){

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserType(user.getUserType());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setPhone(user.getPhone());

        return userDto;
    }

}
