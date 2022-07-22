package hugescrub.cafe.menu.repository;

import hugescrub.cafe.menu.models.EItem;
import hugescrub.cafe.menu.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    MenuItem findByName(String name);

    List<MenuItem> findAllByItemType(EItem itemType);

    List<MenuItem> findByPriceGreaterThan(Double price);

    List<MenuItem> findByPriceLessThan(Double price);

    List<MenuItem> findAllByPriceBetween(Double priceFrom, Double priceUntil);
}
