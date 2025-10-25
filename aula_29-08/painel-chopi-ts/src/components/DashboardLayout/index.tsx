import React from 'react'
import { useEffect, useState } from "react";
import type { IToken } from "../../interfaces/token";
import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CNavTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilLayers, cilPuzzle, cilSpeedometer } from '@coreui/icons'


function DashboardLayout() {

    const [token, setToken] = useState<IToken>()

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        let lsToken = localStorage.getItem('chopts:token')

        // add tipagem viuu
        let token: IToken | null = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
            setToken(token!)
        }
    }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CHOPITS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <span className="navbar-text pe-3">
              Olá, {token?.user.nome}
            </span>
            <button className='btn btn-danger'>Logout</button>
          </div>
        </div>
      </nav>


    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CUI</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge{' '}
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            </>
          }
        >
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Nav dropdown item
          </CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io">
          <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI
        </CNavItem>
        <CNavItem href="https://coreui.io/pro/">
          <CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  )

    </>
  )
}

export default DashboardLayout;