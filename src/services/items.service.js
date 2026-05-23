import supabase from './supabase';

export async function fetchItems() {

  const { data, error } = await supabase
    .from('items')
    .select(`
      id,
      status,
      item_number,
      item_images (
        url,
        position
      ),
      item_platforms (
        platform,
        title,
        price,
        fees,
        buy
      )
    `)
    .order('created_at', {
      ascending: false
    });

  if (error) {
    console.error(
      'Error fetching items:',
      error
    );

    throw error;
  }

  return data.map((item) => {

    const mainImage =
      item.item_images?.[0]?.url ||
      'https://placehold.co/600x600';

    const firstPlatform =
      item.item_platforms?.[0];

    const sellPrice =
      Number(firstPlatform?.price || 0);

    const buyPrice =
      Number(firstPlatform?.buy || 0);

    const fees =
      Number(firstPlatform?.fees || 0);

    const profit =
      sellPrice - buyPrice - fees;

    return {
      id: item.id,

      itemNumber:
        item.item_number,

      title:
        firstPlatform?.title ||
        'Untitled Item',

      status:
        item.status || 'Available',

      price:
        `${sellPrice.toFixed(2)} €`,

      profit:
        `${profit.toFixed(2)} €`,

      image:
        mainImage,

      platforms:
        item.item_platforms || []
    };
  });
}