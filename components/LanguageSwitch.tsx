import React, { FC, useState } from "react"
import { ButtonGroup, Popover, Button } from "@mui/material"
import IconButton, { IconButtonTypeMap } from "@mui/material/IconButton"
import TranslateIcon from "@mui/icons-material/Translate"

import { supportedLangs, useLang, useTranslations } from "models/i18n"
import { useDispatch } from "models"
import styles from "./LanguageSwitch.module.sass"


export type Props = Partial<IconButtonTypeMap["props"]>
const LanguageSwitch: FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const { changeLang } = useDispatch().i18n
  const translations = useTranslations().model.i18n.lang
  const currentLang = useLang()

  const id = anchorEl ? "simple-popover" : undefined;

  return (<>
    <IconButton
      size="large"
      color="inherit"
      {...props}
      aria-describedby={id}
      onClick={(event) => setAnchorEl(event.currentTarget)}>
      <TranslateIcon />
    </IconButton>
    <Popover
      id={id}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      className={styles.langSwitchPoppover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <ButtonGroup orientation="vertical" variant="text">
        {supportedLangs.map(lang => (
          <Button
            className={lang === currentLang ? styles.current : ""}
            key={lang}
            onClick={() => {
              changeLang(lang)
              setAnchorEl(null)
            }}
          >
            {translations[lang]}
          </Button>
        ))}
      </ButtonGroup>
    </Popover>
  </>)
}
export default LanguageSwitch
