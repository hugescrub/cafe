package hugescrub.cafe.menu.repository;

import hugescrub.cafe.menu.models.EItem;
import hugescrub.cafe.menu.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByName(String name);

    Boolean existsByName(String name);

    Boolean existsByItemType(EItem itemType);

    List<Item> findAllByItemType(EItem itemType);

    List<Item> findByPriceGreaterThan(Double price);

    List<Item> findByPriceLessThan(Double price);

    List<Item> findAllByPriceBetween(Double priceFrom, Double priceUntil);
}
