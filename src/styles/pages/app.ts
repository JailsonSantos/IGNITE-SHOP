import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
})

export const Header = styled('header', {
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  padding: '2rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Image = styled('image', {});

export const AreaCart = styled('div', {
  svg: {
    padding: 3,
    borderRadius: 4,
    color: '$gray700',
    background: '$gray800',
    border: '1px solid $gray800',

    '&:hover': {
      cursor: 'pointer',
      color: '$gray300',
    },
  },

  span: {
    position: 'relative',
    left: '-10px',
    top: '-30px',
    fontSize: '12px',
    background: '$green500',
    padding: '5px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    border: '1px solid $gray700',
  }

});