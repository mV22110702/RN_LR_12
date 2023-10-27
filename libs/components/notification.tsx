import {
  Alert,
  Text,
  HStack,
  useToast,
  VStack,
  IconButton,
  CloseIcon,
  Toast, Pressable,
} from 'native-base';
import { InterfaceAlertProps } from 'native-base/lib/typescript/components/composites/Alert/types';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

export const Notification = ({
  id,
  status,
  variant,
  title,
  description,
  ...rest
}: InterfaceAlertProps &
  Pick<InterfaceToastProps, 'title' | 'description'>) => {
  return (
    <Pressable onPress={() => Toast.close(id)}>
      <Alert
        maxWidth="100%"
        alignSelf="center"
        flexDirection="row"
        status={status ? status : 'info'}
        variant={variant}
        {...rest}
      >
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                flexShrink={1}
                color={
                  variant === 'solid'
                    ? 'lightText'
                    : variant !== 'outline'
                    ? 'darkText'
                    : null
                }
              >
                {title}
              </Text>
            </HStack>
          </HStack>
          {description && <Text
              px="6"
              color={
                variant === 'solid'
                    ? 'lightText'
                    : variant !== 'outline'
                        ? 'darkText'
                        : null
              }
          >
            {description}
          </Text>}
        </VStack>
      </Alert>
    </Pressable>
  );
};
