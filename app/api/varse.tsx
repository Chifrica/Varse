import { supabase } from "../utils/supabase";

// get all items for the logged-in vendor
export const getAllItem = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    let { data, error } = await supabase
        .from('productsUpload')
        .select('*')
        .eq('vendor_id', user.id)

    if (error) {
        throw new Error(error.message);
    }
    return data
}

// get all items for buyers
export const getItemsForBuyers = async () => {
    let { data, error } = await supabase
        .from('productsUpload')
        .select('*')
        
    if (error) {
        throw new Error(error.message);
    }
    return data
}

// create an item

export const createItem = async ({ productName, description, category, price, stockQuantity, weight, color, image_url, location, shopName, vendor_id }) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        alert("You need to login to upload a product");
        return;
    }

    const { data, error } = await supabase
        .from("productsUpload")
        .insert([{ productName, description, category, price, stockQuantity, weight, color, image_url, location, shopName, vendor_id: user.id }])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export const updateItem = async (id, updatedData) => {
    const { data, error } = await supabase
        .from('productsUpload')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const deleteItem = async (id) => {
    const { error } = await supabase
        .from("productsUpload")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(error.message)
    }
}

export const updateProfile = async (full_name, id, email, phone_number, address, avatar_url, updated_at, role) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            full_name,
            email,
            phone_number,
            address,
            avatar_url,
            updated_at,
            role
        })
        .eq("id", id)

    if (error) {
        throw new Error(error.message)
    }
    return data
}

