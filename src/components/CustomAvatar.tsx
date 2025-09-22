import type { AvatarComponent } from '@rainbow-me/rainbowkit';

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {

  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{
        borderRadius: '50%',
        border: `2px solid ${color}33`,
        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        objectFit: 'cover',
      }}
    />
  ) : (
    <div
      style={{
        background: "linear-gradient(to right, #4a98f8, #bf65f7)",
        borderRadius: '50%',
        height: size,
        width: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2.5,
        color: 'white',
        fontWeight: 'bold',
        userSelect: 'none',
        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
      }}
    >
      {address.slice(2, 4).toUpperCase()}
    </div>
  );
};
