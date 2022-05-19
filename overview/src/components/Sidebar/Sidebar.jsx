import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  width: 15%;
  text-align: center;
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-family: var(--font-family);
`

const Title = styled.h1`
  font-family: var(--font-family);
  font-size: 1.2rem;
  margin-bottom: 10px;
`

const Sidebar = () => {
  const started = [
    {
      name: 'Intro',
      path: '/ms/intro',
    },
    { name: 'Install', path: '/ms/install' },
  ]

  const core = [
    { name: 'STT', path: '/ms/stt' },
    {
      name: 'NLP',
      path: '/ms/nlp',
    },
    { name: 'TTS', path: '/ms/tts' },
  ]

  const ref = [
    { name: 'References', path: '/ms/references' },
    { name: 'License', path: '/ms/license' },
  ]
  return (
    <Side>
      <Title>Getting Started</Title>
      <Menu>
        {started.map((menu, index) => {
          return (
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activestyle={{ color: 'red' }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          )
        })}
      </Menu>
      <Title>Core</Title>
      <Menu>
        {core.map((menu, index) => {
          return (
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activestyle={{ color: 'red' }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          )
        })}
      </Menu>
      <Title>Resources</Title>
      <Menu>
        {ref.map((menu, index) => {
          return (
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activestyle={{ color: 'red' }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          )
        })}
      </Menu>
    </Side>
  )
}

export default Sidebar
