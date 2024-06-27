package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.AdDTO;
import lt.techin.ovidijus.back.exceptions.AdNotFoundException;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Ad;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.AdRepository;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdService {

    private final CategoryRepository categoryRepository;
    private AdRepository adRepository;
    private UserService userService;

    @Autowired
    public AdService(CategoryRepository categoryRepository, AdRepository adRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.adRepository = adRepository;
        this.userService = userService;
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    public Optional<Ad> getOneAd(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Id must not be null");
        }
        return adRepository.findById(id);
    }

    public Ad addAd(AdDTO adDTO) throws NotAdminException, CategoryNotFoundException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can add ads!");
        }
        if (adRepository.existsByTitle(adDTO.getTitle())) {
            throw new RuntimeException("This ad already exists!");
        }

        Category category =
                categoryRepository.findById(adDTO.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException(
                        "Category not found"));


        Ad ad = new Ad();
        ad.setTitle(adDTO.getTitle());
        ad.setDescription(adDTO.getDescription());
        ad.setPrice(adDTO.getPrice());
        ad.setCity(adDTO.getCity());
        ad.setCategory(category);

        return adRepository.save(ad);
    }

    public Ad updateAd(Long id, AdDTO ad) throws AdNotFoundException, NotAdminException,
            CategoryNotFoundException {

        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can edit ads.");
        }

        Ad existingAD = adRepository.findById(id)
                .orElseThrow(() -> new AdNotFoundException("Ad with id: " + id + " not found"));

        if (ad.getTitle() != null) {
            existingAD.setTitle(ad.getTitle());
        }
        if (ad.getDescription() != null) {
            existingAD.setDescription(ad.getDescription());
        }
        if (ad.getCity() != null) {
            existingAD.setCity(ad.getCity());
        }
        if (ad.getPrice() != null) {
            existingAD.setPrice(ad.getPrice());
        }

        if (ad.getCategoryId() != null) {
            Category cat = categoryRepository.findById(ad.getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException("Category with id: " + ad.getCategoryId() + " " +
                            "not found"));
            existingAD.setCategory(cat);
        }
        return adRepository.save(existingAD);
    }

    public void deleteAd(long id) throws AdNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can delete ads!");
        }
        if (adRepository.existsById(id)) {
            adRepository.deleteById(id);
        } else {
            throw new AdNotFoundException("Book not found!");
        }
    }

    public User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }
}
