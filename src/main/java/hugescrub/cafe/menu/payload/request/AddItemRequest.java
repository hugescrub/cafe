package hugescrub.cafe.menu.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AddItemRequest {

    @NotBlank
    @NotNull
    private String menuTitle;

    @NotBlank
    @NotNull
    private String itemName;

    public AddItemRequest(String menuTitle, String itemName) {
        this.menuTitle = menuTitle;
        this.itemName = itemName;
    }

    public String getMenuTitle() {
        return menuTitle;
    }

    public String getItemName() {
        return itemName;
    }
}
