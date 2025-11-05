import { supabase } from "../utils/supabase";

export const getAllItem = async () => {

    let { data, error } = await supabase
        .from('productsUpload')
        .select('*')

    if (error) {
        throw new Error (error.message);
    }
    return data
}

// create an item

export const createItem = async({productName, description, category, price, stockQuantity, weight, color, image_url }) => {
    const {data, error} = await supabase
        .from("productsUpload")
        .insert([{productName, description, category, price, stockQuantity, weight, color, image_url}])
        .select()
        .single()

    if (error) {
        throw new Error (error.message)
    }

    return data;
}

export const deleteItem = async(id) => {
    const {error} = await supabase
        .from("productsUpload")
        .delete()
        .eq("id", id)
    
    if (error) {
        throw new Error (error.message)
    }
}