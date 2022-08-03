package hugescrub.cafe.menu.payload.response;

import hugescrub.cafe.menu.models.EType;

import java.time.LocalTime;

public class MenuUpdateResponse {

    private EType type;
    private String title;
    private LocalTime availableFrom;
    private LocalTime availableUntil;

    public MenuUpdateResponse(EType type, String title, LocalTime availableFrom, LocalTime availableUntil) {
        this.type = type;
        this.title = title;
        this.availableFrom = availableFrom;
        this.availableUntil = availableUntil;
    }

    public EType getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public LocalTime getAvailableFrom() {
        return availableFrom;
    }

    public LocalTime getAvailableUntil() {
        return availableUntil;
    }
}
