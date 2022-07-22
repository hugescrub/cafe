package hugescrub.cafe.menu.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 30)
    private String name;

    @NotBlank
    private Double price;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private EItem itemType;

    public MenuItem() {
    }

    public MenuItem(String name, Double price, EItem itemType) {
        this.name = name;
        this.price = price;
        this.itemType = itemType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public EItem getItemType() {
        return itemType;
    }

    public void setItemType(EItem itemType) {
        this.itemType = itemType;
    }
}
