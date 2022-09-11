export interface cloudinaryResponse {
    asset_id: string,
    public_id: string
    version: number,
    version_id: string,
    signature: string,
    width: number,
    height: number,
    format: string,
    resource_type: string,
    created_at: Date,
    tags: [],
    bytes: number,
    type: string,
    etag: string,
    placeholder: boolean,
    url: string,
    secure_url: string,
    folder: string,
    original_filename: string,
    api_key: string
}

export interface imagesToDeleteBody {
    images: string[]
}

export interface avatarToDeleteBody {
    images: string
}