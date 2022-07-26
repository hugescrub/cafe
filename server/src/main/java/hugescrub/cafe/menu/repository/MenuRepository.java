package hugescrub.cafe.menu.repository;

import hugescrub.cafe.menu.models.EType;
import hugescrub.cafe.menu.models.Item;
import hugescrub.cafe.menu.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    Boolean existsByTitle(String title);

    Menu findByTitle(String title);

    List<Menu> findByAvailableFromGreaterThanEqualAndAvailableUntilLessThanEqual(LocalTime availableFrom, LocalTime availableUntil);

    List<Menu> findAllByIsActive(Boolean isActive);

    List<Menu> findAllByIsActiveAndType(Boolean isActive, EType type);

    List<Menu> findAllByItems(Item item);
}
