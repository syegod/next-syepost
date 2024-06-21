import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {
        message: 'Minimum password length is 6'
    }).max(20, {
        message: 'Maximum password length is 20'
    }),
    name: z.string().min(4, {
        message: 'Minimum username length is 4'
    }).max(30, {
        message: 'Maximum username length is 30'
    })
});

export const ChangeUsernameSchema = z.string().min(4, {
    message: 'Minimum username length is 4' 
}).max(30, {
    message: 'Maximum username length is 30'
});

export const ChangeEmailSchema = z.string().email().min(4, {
    message: 'Minimum username length is 4' 
}).max(30, {
    message: 'Maximum username length is 30'
});

export const ResetPasswordSchema = z.string().min(6, {
    message: 'Minimum password length is 6'
}).max(20, {
    message: 'Maximum password length is 20'
})