package io.codeforall.fanstatics.opticpal.converters;

import io.codeforall.fanstatics.opticpal.command.UserDto;
import io.codeforall.fanstatics.opticpal.persistence.model.User;

public class UserToUserDto {

    public UserDto convert(User user){

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUserType(user.getUser_type());
        userDto.setFirstName(user.getFirst_name());
        userDto.setLastName(user.getLast_name());
        userDto.setPhone(user.getPhone());

        return userDto;
    }

}
