package hugescrub.cafe.menu.dto;

import hugescrub.cafe.menu.models.EItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private String name;
    private Double price;
    private EItem itemType;
    private String description;
    private byte[] image;
}
