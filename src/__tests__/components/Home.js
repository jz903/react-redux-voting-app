import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'

import Home from '../../components/Home'

const setup = (user = {}) => {
  const component = <Home user={user} />
  const componentWithRouter = (
    <MemoryRouter>
      <Home user={user} />
    </MemoryRouter>
  )
  const wrapper = shallow(component)

  return {
    component,
    componentWithRouter,
    wrapper,
  }
}

describe('Home component', () => {
  it('should render without errors', () => {
    const { wrapper } = setup()

    expect(wrapper).toBeTruthy()
  })

  it('should render correct things', () => {
    const { wrapper } = setup()

    expect(wrapper.find('.App').length === 1).toBe(true)
  })

  it("should render right thing and don't change unexpected", () => {
    const { componentWithRouter } = setup()
    const tree = renderer.create(componentWithRouter).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
