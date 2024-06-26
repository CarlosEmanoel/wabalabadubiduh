import { tv } from 'tailwind-variants';

const buttonVariants = tv({
    base: `select-none inline-flex cursor-pointer items-center text-sm font-medium text-center text-white bg-secondary_blue hover:bg-secondary_blue_hover rounded-md shadow-xl`,
    variants: {
        text: {
            'xs': 'text-xs',
            'sm': 'text-sm',
            'md': 'text-md',
            'lg': 'text-lg',
            'xl': 'text-xl',
            '2xl': 'text-xl',
            '3xl': 'text-xl',
            '4xl': 'text-xl'
        },
        size: {
            'xs': 'px-3.5 py-3.5',
            'sm': 'px-3.5 py-3.5',
            'md': 'px-3.5 py-3.5',
            'lg': 'px-3.5 py-3.5',
            'xl': 'px-3.5 py-4',
            '2xl': 'px-3.5 py-4',
            '3xl': 'px-3.5 py-4',
            '4xl': 'px-3.5 py-4'
        },
        bg: {
            'primary': 'bg-primary_blue hover:bg-primary_blue_hover text-white',
            'secondary': 'bg-secondary_blue hover:bg-secondary_blue_hover text-white',
            'success': 'bg-success hover:bg-success_hover text-gray-800',
            'alert': 'bg-warning hover:bg-warning_hover text-gray-800',
            'info': 'bg-info hover:bg-info_hover text-white',
            'danger': 'bg-error hover:bg-error_hover text-white',
        },
    },
});

const cardVariants = tv({
    base: `select-none`,
    variants: {
        size: {
            'xs': 'w-1/1 p-4',
            'sm': 'w-1/1 p-4',
            'md': 'w-1/1 p-4',
            'lg': 'w-1/3 p-4',
            'xl': 'w-1/3 p-4',
            '2xl': 'w-1/3 p-4',
            '3xl': 'w-1/3 p-4',
            '4xl': 'w-1/3 p-4'
        },
        cursor: {
            'pointer': "cursor-pointer",
            'auto': "cursor-auto",
            'default': "cursor-default",
            'wait': "cursor-wait",
            'text': "cursor-text",
            'move': "cursor-move",
            'help': "cursor-help",
            'blocked': "cursor-not-allowed",
            'none': "cursor-none",
        },
        /* "h-full border-none border-opacity-60 rounded-lg overflow-hidden hover:text-white bg-gray-200 hover:bg-primary_blue_hover shadow-xl" */

        /* bg: {
            white: 'bg-white',
            gray: 'bg-gray-100',
            blue: 'bg-blue-100',
        },
        textColor: {
            primary: 'text-gray-800',
            secondary: 'text-gray-600',
        }, */
    },
    defaultVariants: {
        /* bg: 'white', */
        /* textColor: 'primary', */
    },

});

const tabBarCardVariants = tv({
    base: '',
    variants: {
        size: {
            'xs': 'w-[80vw] flex-col select-none mx-auto my-4 rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            'sm': 'w-[80vw] flex-col select-none mx-auto my-4 rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            'md': 'w-[80vw] flex-col select-none mx-auto my-4 rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            'lg': 'w-[80vw] flex-col select-none mx-auto my-4 rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            'xl': 'w-[90vw] relative select-none mx-auto my-4 flex flex-row rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            '2xl': 'w-[90vw] relative select-none mx-auto my-4 flex flex-row rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            '3xl': 'w-[90vw] relative select-none mx-auto my-4 flex flex-row rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
            '4xl': 'w-[90vw] relative select-none mx-auto my-4 flex flex-row rounded-xl bg-slate-100 text-primary_blue shadow-lg shadow-black_transparent',
        },
        photoSize: {
            'xs': 'm-0 w-full flex items-center shrink-0 overflow-hidden rounded-xl rounded-b-none bg-white bg-clip-border text-primary_blue',
            'sm': 'm-0 w-full flex items-center shrink-0 overflow-hidden rounded-xl rounded-b-none bg-white bg-clip-border text-primary_blue',
            'md': 'm-0 w-full flex items-center shrink-0 overflow-hidden rounded-xl rounded-b-none bg-white bg-clip-border text-primary_blue',
            'lg': 'm-0 w-full flex items-center shrink-0 overflow-hidden rounded-xl rounded-b-none bg-white bg-clip-border text-primary_blue',
            'xl': 'relative min-h-[60vh] max-h-[60vh] m-0 w-[40vw] flex items-center shrink-0 overflow-hidden rounded-xl rounded-l-xl rounded-r-none bg-white bg-clip-border text-primary_blue',
            '2xl': 'relative min-h-[60vh] max-h-[60vh] m-0 w-[40vw] flex items-center shrink-0 overflow-hidden rounded-xl rounded-l-xl rounded-r-none bg-white bg-clip-border text-primary_blue',
            '3xl': 'relative min-h-[60vh] max-h-[60vh] m-0 w-[40vw] flex items-center shrink-0 overflow-hidden rounded-xl rounded-l-xl rounded-r-none bg-white bg-clip-border text-primary_blue',
            '4xl': 'relative min-h-[60vh] max-h-[60vh] m-0 w-[40vw] flex items-center shrink-0 overflow-hidden rounded-xl rounded-l-xl rounded-r-none bg-white bg-clip-border text-primary_blue',
        },
        mms: {
            'xs': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            'sm': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            'md': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            'lg': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            'xl': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            '2xl': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
            '3xl': 'pb-6 xl:w-1/2 sm:w-full flex flex-col justify-between',
        },
        title: {
            'xs': 'mb-2 block font-sans text-sm font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            'sm': 'mb-2 block font-sans text-md font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            'md': 'mb-2 block font-sans text-lg font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            'lg': 'mb-2 block font-sans text-xl font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            'xl': 'mb-2 block font-sans text-2xl font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            '2xl': 'mb-2 block font-sans text-3xl font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
            '3xl': 'mb-2 block font-sans text-4xl font-semibold uppercase leading-relaxed tracking-normal text-secondary_blue antialiased',
        },
        subtitle: {
            'xs': 'mb-2 block font-sans text-xs font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            'sm': 'mb-2 block font-sans text-sm font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            'md': 'mb-2 block font-sans text-md font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            'lg': 'mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            'xl': 'mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            '2xl': 'mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary_blue antialiased',
            '3xl': 'mb-2 block font-sans text-3xl font-semibold leading-snug tracking-normal text-primary_blue antialiased',
        },
        description: {
            'xs': 'mb-2 block font-sans text-xs leading-snug tracking-normal text-primary_blue antialiased',
            'sm': 'mb-2 block font-sans text-sm leading-snug tracking-normal text-primary_blue antialiased',
            'md': 'mb-2 block font-sans text-md leading-snug tracking-normal text-primary_blue antialiased',
            'lg': 'mb-2 block font-sans text-lg leading-snug tracking-normal text-primary_blue antialiased',
            'xl': 'mb-2 block font-sans text-lg leading-snug tracking-normal text-primary_blue antialiased',
            '2xl': 'mb-2 block font-sans text-lg leading-snug tracking-normal text-primary_blue antialiased',
            '3xl': 'mb-2 block font-sans text-lg leading-snug tracking-normal text-primary_blue antialiased',
        }
    }
})

const iconVaiants = tv({
    base: '',
    icon: {
        'user': 'curso-clwl17lo5000bvsrkv29g232v',
        'puser': 'ic_object_calendar_days_filled',
    }
})

const buttonIconVariants = tv({
    base: `group hover:opacity-75 inline-flex items-center font-semibold text-g1 justify-center select-none cursor-pointer text-sm text-center`,
    variants: {
        type: {
            outlined: "px-1 color-primary-blue border-b-2 border-primary_blue border-b-2",
        },
        text: {
            'xs': 'text-xs',
            'sm': 'text-sm',
            'md': 'text-md',
            'lg': 'text-lg',
            'xl': 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl'
        },
        size: {
            'xs': 'px-4',
            'sm': 'px-4',
            'md': 'px-4',
            'lg': 'px-4 py-3',
            'xl': 'px-4 py-3.5',
            '2xl': 'px-4 py-3.5',
            '3xl': 'px-4 py-3.5'
        },
    },
});

const testimonialVariants = tv({
    base: `select-none xl:w-1/3 lg:w-1/2 bg-red-500`,
    variants: {
        size: {
            'xs': 'w-1/1 p-4',
            'sm': 'w-1/1 p-4',
            'md': 'w-1/1 p-4',
            'lg': 'w-1/3 p-4',
            'xl': 'w-1/3 p-4',
            '2xl': 'w-1/3 p-4',
            '3xl': 'w-1/3 p-4'
        },
        cursor: {
            'pointer': "cursor-pointer",
            'auto': "cursor-auto",
            'default': "cursor-default",
            'wait': "cursor-wait",
            'text': "cursor-text",
            'move': "cursor-move",
            'help': "cursor-help",
            'blocked': "cursor-not-allowed",
            'none': "cursor-none",
        },
        /* "h-full border-none border-opacity-60 rounded-lg overflow-hidden hover:text-white bg-gray-200 hover:bg-primary_blue_hover shadow-xl" */

        /* bg: {
            white: 'bg-white',
            gray: 'bg-gray-100',
            blue: 'bg-blue-100',
        },
        textColor: {
            primary: 'text-gray-800',
            secondary: 'text-gray-600',
        }, */
    },
    defaultVariants: {
        'cursor': 'pointer'
        /* bg: 'white', */
        /* textColor: 'primary', */
    },

});

export { buttonVariants, cardVariants, buttonIconVariants, testimonialVariants, tabBarCardVariants, iconVaiants };