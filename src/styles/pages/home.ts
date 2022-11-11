import { styled } from "..";

export const HomeContainer = styled('main', {
  width: '100%',
  minHeight: 500,
  display: 'flex',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
})

export const Product = styled('a', {
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover'
  },

  footer: {
    padding: '1rem',
    left: '0.25rem',
    right: '0.25rem',
    bottom: '0.25rem',
    overflow: 'hidden',
    position: 'absolute',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between ',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    opacity: 0,
    transform: 'translateY(110%)',
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
    },

    'strong': {
      fontSize: '$lg',
      marginBottom: '10px',
    },

    span: {
      fontSize: '$xl',
      color: '$green300',
      fontWeight: 'bold',
    },
    a: {
      textDecoration: 'none',
      color: '$white',
    }
  },

  '&:hover': {
    footer: {
      opacity: 1,
      transform: 'translateY(0%)',
    }
  },

  svg: {
    padding: 5,
    borderRadius: 4,
    background: '$green500',
    border: '1px solid $green500',


    '&:hover': {
      cursor: 'pointer',
      background: '$green300',
      border: '1px solid $green300',
    },
  }
});

export const NextButton = styled('button', {
  right: 5,
  border: 0,
  top: '35vh',
  zIndex: 9999,
  minWidth: '40px',
  minHeight: '40px',
  color: '$gray100',
  borderRadius: '20px',
  position: 'absolute',
  background: 'transparent',

  '&:hover': {
    cursor: 'pointer',
    color: '$gray300',
    border: '1px solid $gray300',
  }

});

export const PrevButton = styled('button', {
  left: 5,
  border: 0,
  top: '35vh',
  zIndex: 9999,
  minWidth: '40px',
  minHeight: '40px',
  color: '$gray100',
  borderRadius: '20px',
  position: 'absolute',
  background: 'transparent',

  '&:hover': {
    cursor: 'pointer',
    color: '$gray300',
    border: '1px solid $gray300',
  }
});
