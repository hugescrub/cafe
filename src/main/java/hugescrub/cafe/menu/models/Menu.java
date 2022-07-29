package hugescrub.cafe.menu.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "menus")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private EType type;

    @NotBlank
    @NotNull
    @Size(min = 5, max = 20)
    private String title;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime availableFrom;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime availableUntil;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "menu_items",
            joinColumns = @JoinColumn(name = "menu_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<Item> items;

    public Menu() {
    }

    public Menu(EType type, String title, LocalTime availableFrom, LocalTime availableUntil) {
        this.type = type;
        this.title = title;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
    }

    @Override
    public String toString() {
        return "{\n" +
                "Menu type = '" + type +
                "'\nMenu title = '" + title + '\'' +
                "\nAvailable between = '" + availableFrom + "-" + availableUntil +
                "'\n}";
    }

    public EType getType() {
        return type;
    }

    public void setType(EType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalTime getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalTime availableFrom) {
        this.availableFrom = availableFrom;
    }

    public LocalTime getAvailableUntil() {
        return availableUntil;
    }

    public void setAvailableUntil(LocalTime availableUntil) {
        this.availableUntil = availableUntil;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
