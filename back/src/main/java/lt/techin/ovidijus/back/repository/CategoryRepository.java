package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByTitle(Category title);

    boolean existsByTitle(String title);
}
