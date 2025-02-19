package CS320;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@Path("/cart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CartResource {

    /**
     * GET /cart : Returns all cart items
     */
    @GET
    public List<Cart> getAllCartItems() {
        return Cart.listAll();
    }

    /**
     * GET /cart/{id} : Return a single cart item by ID
     */
    @GET
    @Path("/{id}")
    public Cart getCartItemById(@PathParam("id") Long id) {
        Cart cartItem = Cart.findById(id);
        if (cartItem == null) {
            throw new NotFoundException("Cart item not found with id=" + id);
        }
        return cartItem;
    }

    /**
     * POST /cart : Add an item to the cart. If the product already exists, increase its quantity.
     */
    @POST
    @Transactional
    public String addToCart(Cart cartItem) {
        Cart existingItem = Cart.find("productId", cartItem.productId).firstResult();

        if (existingItem != null) {
            existingItem.quantity += cartItem.quantity; // Increase quantity instead of adding duplicate
            existingItem.persist();
        } else {
            cartItem.persist();
        }
        return "Product added to cart successfully";
    }

    /**
     * PUT /cart/{id} : Update quantity of an existing cart item
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Cart updateCartItem(@PathParam("id") Long id, Cart updates) {
        Cart cartItem = Cart.findById(id);
        if (cartItem == null) {
            throw new NotFoundException("Cart item not found with id=" + id);
        }

        cartItem.quantity = updates.quantity;
        cartItem.persist();

        return cartItem;
    }

    /**
     * DELETE /cart/{id} : Remove an item from the cart
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public String removeCartItem(@PathParam("id") Long id) {
        Cart cartItem = Cart.findById(id);
        if (cartItem == null) {
            throw new NotFoundException("Cart item not found with id=" + id);
        }
        cartItem.delete();
        return "Cart item removed successfully";
    }
}