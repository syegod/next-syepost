'use client';
import { ClientUser } from "@/types";
import { DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Avatar } from "../user/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { normalizeText } from "@/lib/normalize-text";

interface ProfileCardProps {
    userData: ClientUser,
    isOwner: boolean
}

const ProfileCard: FC<ProfileCardProps> = ({
    userData,
    isOwner
}) => {
    console.log(userData);
    return (
        <div className="border rounded-xl grid gap-y-6 overflow-hidden">
            <div className="grid relative">
                <div className="bg-slate-500 h-20 w-full relative">
                    <button title="Edit profile screen image" className="absolute bottom-2 right-2 bg-background p-1.5 rounded-full hover:bg-background/50 transition shadow">
                        <Pencil1Icon className="text-primary" />
                    </button>
                </div>
                <div className="w-16 absolute left-2 top-2">
                    <Avatar src={userData.image} user={userData} />
                </div>
                <div className="inline-flex items-center justify-between py-3 px-3">
                    <div className="grid gap-y-2">
                        <div className="inline-flex items-center gap-x-2">
                            <span className="font-medium text-lg">{userData.name}</span>
                            <span>·</span>
                            <span className={`font-bold text-md ${userData.role === 'ADMIN' ? `bg-gradient-to-r from-sky-600 to-fuchsia-500 bg-clip-text text-transparent` : `text-muted-foreground`}`}>{normalizeText(userData.role)}</span>
                        </div>
                        <span className="font-medium text-xs text-muted-foreground">{userData.email}</span>
                        <span className="font-medium text-sm text-muted-foreground">from {userData.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="">
                        {isOwner ?
                            <Link href={'/profile/settings'}>
                                <Pencil1Icon />
                            </Link> :
                            <div className="inline-flex items-center gap-2">
                                <Button size={'sm'} className="px-6">
                                    Follow
                                </Button>
                                <Button size={'sm'} variant={'ghost'}>
                                    <DotsHorizontalIcon/>
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default ProfileCard;