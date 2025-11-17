import { supabase } from "../utils/supabase";

export const getAllItem = async () => {

    let { data, error } = await supabase
        .from('productsUpload')
        .select('*')

    if (error) {
        throw new Error(error.message);
    }
    return data
}

// create an item

export const createItem = async ({ productName, description, category, price, stockQuantity, weight, color, image_url, location, shopName }) => {
    const { data, error } = await supabase
        .from("productsUpload")
        .insert([{ productName, description, category, price, stockQuantity, weight, color, image_url, location, shopName }])
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

export const updateProfile = async (full_name, id, email, phone_number, address, avatar_url, updated_at) => {
    const { data, error } = await supabase 
        .from("profiles")
        .update({
            full_name,
            email, 
            phone_number,
            address,
            avatar_url,
            updated_at
        })
        .eq("id", id)

        if (error) {
            throw new Error (error.message)
        }
        return data
}

