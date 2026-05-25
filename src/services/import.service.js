import supabase from './supabase';

import {
    parseImportText
} from '../utils/importParser';

export async function processImportText(
    text,
    images = []
) {

    const parsed =
        parseImportText(text);

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error(
            'User not authenticated'
        );
    }

    const uploadId =
        parsed.uploadId;

    if (!uploadId) {
        throw new Error(
            'Missing upload ID'
        );
    }

    const {
        data: existingItem
    } = await supabase
        .from('items')
        .select('id')
        .eq('upload_id', uploadId)
        .single();

    if (existingItem) {
        throw new Error(
            'This item was already imported'
        );
    }

    const firstPlatform =
        parsed.platforms[0];

    const {
        data: createdItem,
        error: itemError
    } = await supabase
        .from('items')
        .insert({
            user_id: user.id,
            upload_id: uploadId,
            status: 'available'
        })
        .select()
        .single();

    if (itemError) {
        throw itemError;
    }

    const platformRows =
        parsed.platforms.map(
            (platform) => ({
                item_id: createdItem.id,

                platform:
                    platform.platform,

                title:
                    platform.title,

                description:
                    platform.description,

                price:
                    Number(
                        platform.price
                            ?.replace('€', '')
                            ?.trim() || 0
                    ),

                fees:
                    Number(
                        platform.fees
                            ?.replace('€', '')
                            ?.trim() || 0
                    ),

                buy:
                    Number(
                        platform.buy
                            ?.replace('€', '')
                            ?.trim() || 0
                    ),

                url:
                    platform.link
            })
        );

    const {
        error: platformError
    } = await supabase
        .from('item_platforms')
        .insert(platformRows);

    if (platformError) {
        throw platformError;
    }

    for (const image of images) {

        const fileExt =
            image.name.split('.').pop();

        const fileName =
            `${createdItem.id}-${crypto.randomUUID()}.${fileExt}`;

        const filePath =
            `${user.id}/${fileName}`;

        const {
            error: uploadError
        } = await supabase.storage
            .from('item-images')
            .upload(filePath, image);

        if (uploadError) {
            console.error(uploadError);
            continue;
        }

        const {
            data: publicUrlData
        } = supabase.storage
            .from('item-images')
            .getPublicUrl(filePath);

        await supabase
            .from('item_images')
            .insert({

                item_id: createdItem.id,

                url:
                    publicUrlData.publicUrl,

                position: 0

            });

    }

    return createdItem;

}