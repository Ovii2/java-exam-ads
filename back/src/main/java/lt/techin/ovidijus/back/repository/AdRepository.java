package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdRepository extends JpaRepository<Ad, Long> {

    boolean existsByTitle(String title);
}
