import styled from 'styled-components';
import {
  space,
  color,
  layout,
  overflow,
  flexbox,
  border,
  typography,
  position,
  shadow,
  background,
  ColorProps,
  LayoutProps,
  OverflowProps,
  TypographyProps,
  SpaceProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  BackgroundProps,
  compose,
} from 'styled-system';
export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  OverflowProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  BackgroundProps &
  TypographyProps;
export const Box = styled('div')<BoxProps>(
  compose(
    space,
    color,
    layout,
    flexbox,
    overflow,
    border,
    position,
    shadow,
    background,
    typography,
  ),
);
export const Section = styled('section')<BoxProps>(
  compose(
    space,
    color,
    layout,
    flexbox,
    overflow,
    border,
    position,
    shadow,
    background,
    typography,
  ),
);
export const Form = styled('form')<BoxProps>(
  compose(
    space,
    color,
    layout,
    flexbox,
    overflow,
    border,
    position,
    shadow,
    background,
    typography,
  ),
);

// @ts-ignore
export const Flexbox = styled(Box)<FlexboxProps>(flexbox);
type TextProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps;
export const Text = styled('span')<TextProps>(
  compose(space, color, layout, border, typography),
);
export const Label = styled('label')<TextProps>(
  compose(space, color, layout, border, typography),
);
type HeadingProps = SpaceProps & ColorProps & TypographyProps;
export const H1 = styled('h1')<HeadingProps>(compose(space, color, typography));
export const H2 = styled('h2')<HeadingProps>(compose(space, color, typography));
export const H3 = styled('h3')<HeadingProps>(compose(space, color, typography));
type IconProps = SpaceProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  PositionProps;
export const Icon = styled('i')<IconProps>(
  compose(space, color, layout, typography, position),
);
type InputProps = SpaceProps &
  Omit<ColorProps, 'color'> &
  TypographyProps &
  BorderProps &
  LayoutProps & { type?: string };
const StyledInput = styled('input')<InputProps>(
  compose(space, color, typography, border, layout),
);
export const Input = StyledInput;
export const Select = styled('select')<InputProps & ColorProps>(
  compose(space, typography, border, layout),
);
type ButtonProps = SpaceProps &
  TypographyProps &
  BorderProps &
  LayoutProps &
  ColorProps;
export const Button = styled('button')<ButtonProps>(
  compose(space, typography, border, layout, color),
);
type AnchorProps = SpaceProps &
  TypographyProps &
  BorderProps &
  LayoutProps &
  ColorProps;
export const Anchor = styled('a')<AnchorProps>(
  compose(space, typography, border, layout, color),
);
type ImageProps = SpaceProps & LayoutProps;
export const Image = styled('img')<ImageProps>(compose(space, layout));
export const Flex = styled(Flexbox)`
  display: flex;
`;

export type TInputProps = SpaceProps &
  Omit<ColorProps, 'color'> &
  Omit<LayoutProps, 'height' | 'width' | 'size'> &
  TypographyProps &
  BorderProps;
export const TextArea = styled('textarea')<TInputProps>(
  compose(space, color, layout, typography, border),
);
