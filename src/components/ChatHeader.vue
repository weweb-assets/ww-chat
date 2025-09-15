<template>
    <div class="ww-chat-header" :style="headerStyles">
        <div class="ww-chat-header__user">
            <div class="ww-chat-header__avatar" :style="avatarStyles">
                <img v-if="userAvatar" :src="userAvatar" alt="User avatar" />
                <span v-else>{{ userInitials }}</span>
                <div
                    class="ww-chat-header__status-indicator"
                    :class="`ww-chat-header__status-indicator--${userStatus}`"
                    :title="statusText"
                ></div>
            </div>
            <div class="ww-chat-header__info">
                <div class="ww-chat-header__name" :style="nameStyles" :title="participants">{{ userName }}</div>
                <div v-if="userLocation" class="ww-chat-header__location" :style="locationStyles">
                    {{ userLocation }}
                </div>
            </div>
        </div>
        <button v-if="showCloseButton" class="ww-chat-header__close" :style="closeButtonStyles" @click="$emit('close')">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
</template>

<script>
import { computed, inject } from 'vue';

export default {
    name: 'ChatHeader',
    props: {
        userName: {
            type: String,
            required: true,
        },
        userAvatar: {
            type: String,
            default: '',
        },
        userLocation: {
            type: String,
            default: '',
        },
        userStatus: {
            type: String,
            default: 'online',
            validator: value => ['online', 'offline', 'away', 'busy'].includes(value),
        },
        participants: {
            type: String,
            default: '',
        },
        headerBgColor: {
            type: String,
            default: '#ffffff',
        },
        textColor: {
            type: String,
            default: '#1e293b',
        },
        headerBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },

        headerPadding: {
            type: String,
            default: '12px 16px',
        },
        nameFontSize: {
            type: String,
            default: '1rem',
        },
        nameFontWeight: {
            type: String,
            default: '600',
        },
        locationFontSize: {
            type: String,
            default: '0.875rem',
        },
        locationOpacity: {
            type: String,
            default: '0.7',
        },
        closeButtonColor: {
            type: String,
            default: '',
        },
        closeButtonBgHover: {
            type: String,
            default: 'rgba(0, 0, 0, 0.05)',
        },
        showCloseButton: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['close'],
    setup(props) {
        const isEditing = inject(
            'isEditing',
            computed(() => false)
        );

        const userInitials = computed(() => {
            return props.userName
                .split(' ')
                .map(part => part.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2);
        });

        const statusText = computed(() => {
            const statusMap = {
                online: 'Online',
                offline: 'Offline',
                away: 'Away',
                busy: 'Busy',
            };
            return statusMap[props.userStatus] || 'Unknown';
        });

        const headerStyles = computed(() => ({
            backgroundColor: props.headerBgColor,
            color: props.textColor,
            borderBottom: props.headerBorder,
            padding: props.headerPadding,
        }));

        const nameStyles = computed(() => ({
            fontSize: props.nameFontSize,
            fontWeight: props.nameFontWeight,
        }));

        const locationStyles = computed(() => ({
            fontSize: props.locationFontSize,
            opacity: props.locationOpacity,
        }));

        const closeButtonStyles = computed(() => ({
            color: props.closeButtonColor || 'inherit',
            '--hover-bg-color': props.closeButtonBgHover,
        }));

        const avatarStyles = computed(() => ({
            backgroundColor: getAvatarColor(props.userName),
            color: '#ffffff',
        }));

        const getAvatarColor = name => {
            const colors = [
                '#4f46e5',
                '#0891b2',
                '#0d9488',
                '#059669',
                '#16a34a',
                '#84cc16',
                '#ca8a04',
                '#ea580c',
                '#dc2626',
                '#e11d48',
                '#db2777',
                '#a855f7',
            ];

            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }

            const index = Math.abs(hash) % colors.length;
            return colors[index];
        };

        const showCloseButton = computed(() => props.showCloseButton !== false);

        return {
            isEditing,
            userInitials,
            statusText,
            headerStyles,
            nameStyles,
            locationStyles,
            closeButtonStyles,
            avatarStyles,
            showCloseButton,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-shrink: 0;

    &__user {
        display: flex;
        align-items: center;
    }

    &__avatar {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        margin-right: 12px;
        flex-shrink: 0; /* Prevent avatar from shrinking */

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    &__status-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;

        &--online {
            background-color: #22c55e;
        }

        &--offline {
            background-color: #94a3b8;
        }

        &--away {
            background-color: #f59e0b;
        }

        &--busy {
            background-color: #ef4444;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
    }

    &__name {
        line-height: 1.2;
    }

    &__location {
        line-height: 1.2;
        margin-top: 2px;
    }

    &__close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: transparent;
        opacity: 0.7;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            opacity: 1;
            background-color: var(--hover-bg-color, rgba(0, 0, 0, 0.05));
        }
    }
}
</style>
