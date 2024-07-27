import React from 'react'
import styled from 'styled-components'

function Navbar() {
  return (
    <Container>
        <Logo >
              <img src="" alt='Logo' ></img>
        </Logo>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
        height: 60px;
        background-color:black;
        display: flex;
`

const Logo = styled.div`
        padding:10px;
`