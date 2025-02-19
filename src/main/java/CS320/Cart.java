package CS320;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart extends PanacheEntity {

    @Column(nullable = false)
    public Long productId;

    @Column(nullable = false)
    public Integer quantity;

    // No-args constructor
    public Cart() {
    }

    // All-args constructor
    public Cart(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}