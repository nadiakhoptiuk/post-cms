import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Grid } from "@mantine/core";

import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";

import type { TModalForDeleting } from "./ModalsForDeleting.types";
import { NavigationLink } from "~/shared/constants/navigation";

// export const ModalForDeletingPost = ({
//   opened,
//   onClose,
// }: TModalForDeleting) => {
//   const { t } = useTranslation();

//   return (
//     <Modal
//       opened={opened}
//       onClose={onClose}
//       title={t("modal.title", { ns: "common" })}
//       p="lg"
//       centered
//     >
//       {
//         <Grid columns={2}>
//           <Grid.Col span={1}>
//             <Button variant="light" onClick={close} w="100%">
//               {t("buttons.button.cancel", {
//                 ns: "common",
//               })}
//             </Button>
//           </Grid.Col>

//           <Grid.Col span={1}>
//             <Form method="post">
//               <Button
//                 type="submit"
//                 loading={form.formState.isSubmitting}
//                 c="white"
//                 variant="filled"
//                 bg="red"
//                 fullWidth
//               >
//                 {hasBeenDeleted
//                   ? t("buttons.button.restore", {
//                       ns: "common",
//                     })
//                   : t("buttons.button.delete", {
//                       ns: "common",
//                     })}
//               </Button>
//             </Form>
//           </Grid.Col>
//         </Grid>
//       }
//     </Modal>
//   );
// };

export const ModalForDeletingPostWithoutRedirect = ({
  postId,
  opened,
  onClose,
}: TModalForDeleting) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("modal.title", { ns: "common" })}
      p="lg"
      centered
    >
      {
        <Grid columns={2}>
          <Grid.Col span={1}>
            <Button variant="light" onClick={onClose} w="100%">
              {t("buttons.button.cancel", {
                ns: "common",
              })}
            </Button>
          </Grid.Col>

          <Grid.Col span={1}>
            <Button
              c="white"
              variant="filled"
              bg="red"
              fullWidth
              onClick={() => {
                fetcher.submit(
                  { postId: postId },
                  {
                    method: "post",
                    action: NavigationLink.DELETE_POST,
                  }
                );
                onClose();
              }}
            >
              {t("buttons.button.delete", {
                ns: "common",
              })}
            </Button>
          </Grid.Col>
        </Grid>
      }
    </Modal>
  );
};
