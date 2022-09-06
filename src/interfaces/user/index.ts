import { ILookingFor } from '../looking_for'
import { IRelationship } from '../relationship'

// entity -> user
export interface IUserRequest {
	name: string
	email: string
	password: string
	age: number
}

// entity -> userProfile
export interface IUserProfile {
	sexualOrientation: string
	gender: string
	bio: string
	height: number
	profileImage: string
	education: string
	profession: string
	lookingFor: ILookingFor
	typeOfRelationship: IRelationship
	//profileImages: IUserImages
}

// entity -> userProfile
export interface IUserAditionalData {
	userDrinker?: string
	hobbies?: string
	zodiac?: string
	location?: string
	kids?: boolean
	smoker?: boolean
	pets?: boolean
	education?: string
}

// entity -> userImages
// export interface IUserImages {
// 	link: string
// 	width: string
// 	height: string
// 	userProfile: IUserProfile
// }
