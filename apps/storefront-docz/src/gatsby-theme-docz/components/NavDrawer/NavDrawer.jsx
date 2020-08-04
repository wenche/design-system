import React from 'react'
import { useDocs, useConfig } from 'docz'
import { Link } from 'gatsby'

const NavDrawer = () => {
  const docs = useDocs()

  const { menu } = useConfig()

  const firstRouteSegment = /^\/[a-z-]+\//

  const notRootRoute = (doc) => doc.route.length > 1

  const routesWithTwoSegments = (doc) =>
    doc.route.replace(/^\/|\/$/g, '').split('/').length < 3

  const subMenus = docs
    .filter(notRootRoute)
    .filter(routesWithTwoSegments)
    .map((doc) => ({
      title: doc.title,
      route: doc.route,
    }))

  subMenus.forEach((subMenuItem) => {
    const category = menu.find(
      (menuItem) =>
        menuItem.route === subMenuItem.route.match(firstRouteSegment)[0],
    )
    category.children.push(subMenuItem)
  })

  return (
    <ul>
      {menu.map((menuItem) => (
        <li key={menuItem.route}>
          {menuItem.title}
          <ul>
            {menuItem.children.map((subMenuItem) => (
              <li key={subMenuItem.route}>
                <Link to={subMenuItem.route}>{subMenuItem.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export { NavDrawer }