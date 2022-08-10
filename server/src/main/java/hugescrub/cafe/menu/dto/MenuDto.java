package hugescrub.cafe.menu.dto;

import hugescrub.cafe.menu.models.EType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuDto {
    private EType type;
    private String title;
    private LocalTime availableFrom;
    private LocalTime availableUntil;
    private byte[] image;
}
