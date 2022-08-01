package hugescrub.cafe.menu.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "items",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        })
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Size(min = 2, max = 30)
    private String name;

    @NotNull
    private Double price;

    @NotNull
    @Enumerated(EnumType.STRING)
    private EItem itemType;

    public Item() {
    }

    public Item(String name, Double price, EItem itemType) {
        this.name = name;
        this.price = price;
        this.itemType = itemType;
    }

    @Override
    public String toString() {
        return "{\n" +
                "Item name = '" + name +
                "'\nItem price = '" + price + '₽' + '\'' +
                "\nItem type = '" + itemType +
                "'\n}";
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
