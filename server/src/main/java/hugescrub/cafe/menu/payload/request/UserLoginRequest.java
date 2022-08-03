package hugescrub.cafe.menu.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UserLoginRequest {

    @NotBlank
    @NotNull
    private String username;

    @NotBlank
    @NotNull
    private String password;

    public UserLoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
