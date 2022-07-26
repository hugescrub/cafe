package hugescrub.cafe.menu.repository;

import hugescrub.cafe.menu.models.EType;
import hugescrub.cafe.menu.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    Boolean existsByTitle(String title);

    Boolean existsByAvailableFrom(LocalTime availableFrom);

    Boolean existsByAvailableUntil(LocalTime availableUntil);

    Menu findByTitle(String title);

    List<Menu> findByAvailableFromAndAvailableUntil(LocalTime availableFrom, LocalTime availableUntil);

    List<Menu> findByAvailableFrom(LocalTime availableFrom);

    List<Menu> findByAvailableUntil(LocalTime availableUntil);

    List<Menu> findAllByType(EType type);
}
