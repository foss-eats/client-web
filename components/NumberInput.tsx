import React, { FC } from "react"
import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import { ArrowLeft, ArrowRight } from "@mui/icons-material"

import { noop } from "lib/function"
import styles from "./NumberInput.module.sass"


export type Props = {
  value: number,
  min?: number,
  max?: number,
  onChange?: (value: number) => void,
}
const NumberInput: FC<Props> = ({ value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, onChange = noop }) => {
  const isMin = min >= value
  const isMax = value >= max
  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 145 }}>
      <IconButton
        color="primary"
        size="small"
        sx={{ p: '10px' }}
        disabled={isMin}
        onClick={() => !isMin && onChange(value - 1)}
      >
        <ArrowLeft fontSize="inherit" />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        size="small"
        sx={{ ml: 1, flex: 1 }}
        type="number"
        value={value}
        componentsProps={{ input: { min, max } }}
        className={styles.numberInput}
        onChange={(evt) => onChange(Number(evt.target.value))}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        size="small"
        sx={{ p: '10px' }}
        disabled={isMax}
        onClick={() => !isMax && onChange(value + 1)}
      >
        <ArrowRight fontSize="inherit" />
      </IconButton>
    </Paper>
  )
}
export default NumberInput
